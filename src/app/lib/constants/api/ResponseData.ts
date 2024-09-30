class ResponseData<T> {
  private _status: number;
  private _body: T;

  constructor(status: number, body: T) {
    this._status = status;
    this._body = body;
  }

  public get status(): number {
    return this._status;
  }

  public set status(status: number) {
    this._status = status;
  }

  public get body(): T {
    return this._body;
  }

  public set body(body: T) {
    this._body = body;
  }
}

export default ResponseData;
