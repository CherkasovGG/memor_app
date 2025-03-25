import { config } from "../../config";
import { EventEmitter } from "../../events/events";
import { getToken } from "../auth";

const baseURL = config.baseURL + '/notes/block';

const cache = new Map(JSON.parse(localStorage.getItem('blockCache') || '[]'));

const saveCacheToLocalStorage = () => {
    localStorage.setItem('blockCache', JSON.stringify(Array.from(cache.entries())));
};

const getBlock = async (id) => {
    if (cache.has(id)) {
        return Promise.resolve(cache.get(id));
    }

    const response = await fetch(baseURL + '/' + id, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    cache.set(id, data);
    saveCacheToLocalStorage();
    return data;
};

const createBlock = async (data) => {
    const response = await fetch(baseURL + '/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const createdData = await response.json();
    cache.set(createdData.id, createdData);

    const parent = cache.get(createdData.parent);

    if (!parent) {
        return createdData;
    }

    parent.content.push(createdData.id);

    cache.set(parent.id, parent);

    EventEmitter.emit('update-block-' + parent.id);

    saveCacheToLocalStorage();
    return createdData;
};

const patchBlock = async (id, data) => {
    const response = await fetch(baseURL + '/' + id, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const block = {
        id: id,
        type: data.type,
        properties: {},
        content: [],
        ...cache.get(id),
        ...data,
    };

    cache.set(id, block);
    saveCacheToLocalStorage();

    if (data.type)
        EventEmitter.emit('update-block-' + id);
};

const patchTransactionBlock = async (data) => {
    try {
        const response = await fetch(baseURL + '/transaction', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + getToken(),
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        Object.entries(data).forEach(async ([id, data1]) => {
            cache.delete(id);
            saveCacheToLocalStorage();

            if (data1.type) {
                EventEmitter.emit('update-block-' + id);
            }
        });
    } catch (error) {
        console.error('Ошибка при обновлении транзакций:', error);
    }
};

const putBlock = async (id, data) => {
    const response = await fetch(baseURL + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    cache.delete(id);
    saveCacheToLocalStorage();
};

const deleteBlock = async (id) => {
    const block = await getBlock(id);
    
    const response = await fetch(baseURL + '/' + id, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken(),
        },
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const parent = await getBlock(block.parent);

    parent.content = parent.content.filter((val, i) => val !== id);

    cache.delete(id);
    saveCacheToLocalStorage();

    cache.set(parent.id, parent);

    EventEmitter.emit('update-block-' + parent.id); 
    saveCacheToLocalStorage();  
};

const pushBlockChildren = async (dest_id, child_id) => {
    const child = await getBlock(child_id);
    
    const parent = await getBlock(child.parent);

    const index = parent.content.indexOf(child.id);

    parent.content.splice(index, 1);

    const dest = await getBlock(dest_id);
    dest.content.push(child_id);

    patchTransactionBlock({
        [parent.id]: {
            content: parent.content
        },
        [dest_id]: {
            content: dest.content
        },
        [child_id]: {
            parent: dest_id
        },
    })
}

export {
    getBlock,
    createBlock,
    putBlock,
    patchBlock,
    deleteBlock,
    pushBlockChildren,
    patchTransactionBlock,
};
