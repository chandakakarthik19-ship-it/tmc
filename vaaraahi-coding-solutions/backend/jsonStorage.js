import fs from 'fs/promises';
import path from 'path';

class JSONStorage {
  constructor(dataDir = './data') {
    this.dataDir = dataDir;
  }

  async ensureDir() {
    try {
      await fs.access(this.dataDir);
    } catch {
      await fs.mkdir(this.dataDir, { recursive: true });
    }
  }

  getFilePath(collection) {
    return path.join(this.dataDir, `${collection}.json`);
  }

  async readCollection(collection) {
    try {
      const filePath = this.getFilePath(collection);
      const data = await fs.readFile(filePath, 'utf-8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }

  async writeCollection(collection, data) {
    await this.ensureDir();
    const filePath = this.getFilePath(collection);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2));
  }

  async find(collection, query = {}) {
    const data = await this.readCollection(collection);
    if (Object.keys(query).length === 0) {
      return data;
    }
    return data.filter(item => {
      return Object.keys(query).every(key => item[key] === query[key]);
    });
  }

  async findById(collection, id) {
    const data = await this.readCollection(collection);
    return data.find(item => item._id === id || item.id === id);
  }

  async create(collection, item) {
    const data = await this.readCollection(collection);
    const newItem = {
      _id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      ...item,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    data.push(newItem);
    await this.writeCollection(collection, data);
    return newItem;
  }

  async update(collection, id, updates) {
    const data = await this.readCollection(collection);
    const index = data.findIndex(item => item._id === id || item.id === id);
    if (index === -1) return null;
    
    data[index] = {
      ...data[index],
      ...updates,
      _id: data[index]._id,
      updatedAt: new Date().toISOString()
    };
    await this.writeCollection(collection, data);
    return data[index];
  }

  async delete(collection, id) {
    const data = await this.readCollection(collection);
    const filtered = data.filter(item => item._id !== id && item.id !== id);
    await this.writeCollection(collection, filtered);
    return filtered.length < data.length;
  }

  async deleteMany(collection, query = {}) {
    const data = await this.readCollection(collection);
    const filtered = data.filter(item => {
      return !Object.keys(query).every(key => item[key] === query[key]);
    });
    await this.writeCollection(collection, filtered);
    return data.length - filtered.length;
  }
}

export default new JSONStorage();
