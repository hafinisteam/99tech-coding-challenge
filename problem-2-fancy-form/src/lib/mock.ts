import { DataList } from '../type/response'

export const mockDataList = <T>(data: T[], success = true) => {
  const result = new Promise<DataList<T>>((resolve, reject) => {
    setTimeout(() => {
      if (success) {
        resolve({
          data,
        })
      } else {
        reject({
          isSuccess: false,
          messages: [
            {
              content: 'Fail',
              type: 200,
            },
          ],
        })
      }
    }, 500)
  })
  return result
}
