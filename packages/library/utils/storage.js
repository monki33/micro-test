/*
 * @Description: 浏览器存储
 * @Autor: Huanghw
 * @Date: 2020-09-16 16:38:04
 */
import { isArray, isObject } from 'lodash-es'

const _storageType = {
  Local: 'local',
  Session: 'session',
}

/**
 * @method 基础判断
 * @param storageType 存储类型
 * @param encryptType 加密类型
 */
const _core = (storageType = _storageType.Local) => {
  return { storage: storageType === _storageType.Local ? localStorage : sessionStorage }
}
// const _core = (storageType = _storageType.Local, encryptType) => {
//   if (!encryptType) {
//     return { storage: storageType === _storageType.Local ? localStorage : sessionStorage }
//   }
// }

export default class Storage {
  /**
   * @method 将键值存入本地存储
   * @param {*} key 键
   * @param {*} value 值
   * @param {*} type 类型 默认storageType.Local
   * @param {*} encrypt 加密配置项
   */
  static set(key, value, type = _storageType.Local) {
    const { storage } = _core(type)
    const _processed_value = isObject(value) || isArray(value) ? JSON.stringify(value) : value
    storage.setItem(key, _processed_value)
  }

  /**
   * @method 根据key取本地存储数据
   * @param {*} key 键
   * @param {*} type 类型 默认storageType.Local
   * @param {*} encrypt 加密配置项
   */
  static get(key, type = _storageType.Local) {
    const { storage } = _core(type)
    const _stoarge_value = storage.getItem(key)
    try {
      return JSON.parse(_stoarge_value)
    }
    catch (err) {
      return _stoarge_value
    }
  }

  /**
   * @method 根据key删除本地存储数据
   * @param {*} key 键
   * @param {*} type 类型 默认storageType.Local
   */
  static remove(key, type = _storageType.Local) {
    const { storage } = _core(type)
    storage.removeItem(key)
  }

  /**
   * @method 清空本地存储
   * @param {*} type 类型 默认storageType.Local
   */
  static clear(type = _storageType.Local) {
    const { storage } = _core(type)
    storage.clear()
  }

  /**
   * @method 根据key查询本地存储中是否存在key的实例
   * @param {*} key 键
   * @param {*} type 类型 默认storageType.Local
   */
  static had(key, type = _storageType.Local) {
    const { storage } = _core(type)
    return key in storage
  }

  /**
   * @method 获取存储库里存储实例个数
   * @param {*} type
   */
  static count(type = _storageType.Local) {
    const { storage } = _core(type)
    return storage.length
  }
}
