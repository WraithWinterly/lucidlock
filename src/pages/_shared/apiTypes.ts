export enum APIFunctions {
  GET_DREAM = "getDream",
}

export type NoPayload = null;

export type GetDream = {
  Payload: NoPayload;
  Response: {
    dream: string;
  };
};

export type PayloadTypes = {
  [APIFunctions.GET_DREAM]: GetDream["Payload"];
};

export type ResponseTypes = {
  [APIFunctions.GET_DREAM]: GetDream["Response"];
};
