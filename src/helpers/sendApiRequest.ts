type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface IRequest {
  route: string;
  method: Method;
  data?: unknown;
}
function returnCorrectRequest(
  method: Method,
  data: unknown,
): RequestInit {
  if (method === 'GET') {
    return {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    };
  }
  return {
    method: method,
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  };
}

export async function sendApiRequest<T>(
  requestData: IRequest,
): Promise<T> {
  const { route, method, data = {} } = requestData;
  const response = await fetch(
    `http://localhost:3200${route}`,
    returnCorrectRequest(method, data),
  );

  if (!response.ok) {
    const message = `An error has occurred: ${response.status}`;
    throw new Error(message);
  }

  return (await response.json()) as Promise<T>;
}
