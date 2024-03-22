import { Accessor, Signal, createEffect, createSignal } from "solid-js";

export interface useFormProps {
  isValid(): boolean;
  getFormData(): any;
  setFormData(mData: any, check?: boolean): void;
  setCheckValid(name: string, checkFn: Function): void;
  getValidation(name: string): any;
  getMessage(name: string): any;
  bindController(name: string, v: any, setV: Accessor<any>): void;
  setClearValid(name: string, clearFn: Function): void;
  clearValidates(name?: string): void;
  current: Accessor<any>;
  [key: string]: any;
}

export interface useFormParams {
  data: Object;
  validation?: any;
  message?: any;
}

function useForm({
  data: current,
  validation = {},
  message = {},
}: useFormParams): useFormProps {
  const elementsChecks: any = {};
  const elementsClears: any = {};
  const controllers: Map<string, any> = new Map<string, any>();
  const [data, setData] = createSignal(current);
  // const [current, setData] = createSignal(data);
  /**
   * 单字段验证
   * @param name
   * @returns
   */
  const checkField = async (name: string) => {
    const check = elementsChecks[name];
    if (check && !(await check(newData[name]))) {
      return false;
    }
    return true;
  };
  const getValidation = function (name: string) {
    return validation ? validation[name] : {};
  };
  const getMessage = function (name: string) {
    return message ? message[name] : {};
  };
  const getFormData = function () {
    const keys = data();
    return keys;
  };
  const setFormData = function (mData: any) {
    setData(mData);
  };
  const setCheckValid = (name: string, checkFn: Function) => {
    elementsChecks[name] = checkFn;
  };

  const setClearValid = (name: string, clearFn: Function) => {
    elementsClears[name] = clearFn;
  };

  /**
   * 清空校验
   * @param name
   */
  const clearValidates = (name?: string) => {
    if (name) {
      const fn = elementsClears[name];
      if (fn) {
        fn();
      }
    } else {
      const names = Object.keys(elementsClears);
      for (let name of names) {
        const fn = elementsClears[name];
        if (fn) {
          fn();
        }
      }
    }
  };

  const set = (name: string, value: any) => {
    if (controllers.has(name)) {
      const [v, setV] = controllers.get(name);
      setData({
        ...data(),
        [name]: value,
      });
      setV(value);
    }
  };
  const bindController = (name: string, v: any, setV: Function) => {
    controllers.set(name, [v, setV]);
  };
  const newData: any = {
    data,
    getFormData,
    setFormData,
    setCheckValid,
    getValidation,
    getMessage,
    bindController,
    setClearValid,
    clearValidates,
    checkField,
  };
  const ret = new Proxy(newData, {
    get(target, prop: string) {
      if (controllers.has(prop)) {
        const [v] = controllers.get(prop);
        return v();
      }
      return target[prop];
    },
    set(target, prop: string, value) {
      target[prop] = value;
      set(prop, value);

      let check = elementsChecks[prop];
      check && check(value);
      return true;
    },
  });
  return ret;
}
export default useForm;
