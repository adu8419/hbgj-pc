import request from '../utils/request';

const baseUrl = `http://t.pro.saagre.com/api`

export const uploadFileAPI = (files) => {
  const formData = new FormData()
  formData.append('files', files)
  return request({
    url: `${baseUrl}/upload`,
    method: 'post',
    data: formData
  });
};
export const saveUploadFileAPI = (params) => {
  return request({
    url: `${baseUrl}/pc-upload`,
    method: 'post',
    data: params
  });
};


export const getPdfDataAPI = (id) => {
  return request({
    url: `${baseUrl}/street-servicey/check/${id}/report`,
    method: 'get',
  })
}

export const getOptimizePdfDataAPI = (id) => {
  return request({
    url: `${baseUrl}/servicey/check/${id}/report`,
    method: 'get',
  })
}