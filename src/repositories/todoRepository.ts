import { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { TodoDto } from "../dto/todoDto";

export class TodoRepository {
  private s3Client: S3Client;
  private bucketName: string;

  constructor() {
    this.s3Client = new S3Client({ region: "us-east-1" });
    this.bucketName = process.env.S3_BUCKET_NAME || "";
  }

  async create(todo: TodoDto): Promise<string> {
    const id = Date.now().toString();
    const params = {
      Bucket: this.bucketName,
      Key: `todos/${id}.json`,
      Body: JSON.stringify({ ...todo, id }),
    };

    await this.s3Client.send(new PutObjectCommand(params));
    return id;
  }

  async get(id: string): Promise<TodoDto | null> {
    const params = {
      Bucket: this.bucketName,
      Key: `todos/${id}.json`,
    };

    try {
      const response = await this.s3Client.send(new GetObjectCommand(params));
      const todoData = await response.Body?.transformToString();
      return todoData ? JSON.parse(todoData) : null;
    } catch (error) {
      return null;
    }
  }

  async update(id: string, todo: TodoDto): Promise<boolean> {
    const params = {
      Bucket: this.bucketName,
      Key: `todos/${id}.json`,
      Body: JSON.stringify({ ...todo, id }),
    };

    try {
      await this.s3Client.send(new PutObjectCommand(params));
      return true;
    } catch (error) {
      return false;
    }
  }

  async delete(id: string): Promise<boolean> {
    const params = {
      Bucket: this.bucketName,
      Key: `todos/${id}.json`,
    };

    try {
      await this.s3Client.send(new DeleteObjectCommand(params));
      return true;
    } catch (error) {
      return false;
    }
  }
}