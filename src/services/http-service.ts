import { API_BACKEND_URL } from './../util/api-constants';

export class HttpService {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_BACKEND_URL;
  }

  private async makeRequest<T>(
    method: string,
    path: string,
    data: any = null,
  ): Promise<T> {
    const response = await fetch(`${this.baseUrl}/${path}`, {
      method,
      ...(data && { body: JSON.stringify(data) }),
    });
    const responseJson = await response.json();
    return responseJson as T;
  }

  public async get<T>(path: string): Promise<T> {
    return this.makeRequest('get', path);
  }
};

export default HttpService;
