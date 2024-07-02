"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepository = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
class TodoRepository {
    s3Client;
    bucketName;
    constructor() {
        this.s3Client = new client_s3_1.S3Client({ region: "us-east-1" });
        this.bucketName = process.env.S3_BUCKET_NAME || "";
    }
    async create(todo) {
        const id = Date.now().toString();
        const params = {
            Bucket: this.bucketName,
            Key: `todos/${id}.json`,
            Body: JSON.stringify({ ...todo, id }),
        };
        await this.s3Client.send(new client_s3_1.PutObjectCommand(params));
        return id;
    }
    async get(id) {
        const params = {
            Bucket: this.bucketName,
            Key: `todos/${id}.json`,
        };
        try {
            const response = await this.s3Client.send(new client_s3_1.GetObjectCommand(params));
            const todoData = await response.Body?.transformToString();
            return todoData ? JSON.parse(todoData) : null;
        }
        catch (error) {
            return null;
        }
    }
    async update(id, todo) {
        const params = {
            Bucket: this.bucketName,
            Key: `todos/${id}.json`,
            Body: JSON.stringify({ ...todo, id }),
        };
        try {
            await this.s3Client.send(new client_s3_1.PutObjectCommand(params));
            return true;
        }
        catch (error) {
            return false;
        }
    }
    async delete(id) {
        const params = {
            Bucket: this.bucketName,
            Key: `todos/${id}.json`,
        };
        try {
            await this.s3Client.send(new client_s3_1.DeleteObjectCommand(params));
            return true;
        }
        catch (error) {
            return false;
        }
    }
}
exports.TodoRepository = TodoRepository;
