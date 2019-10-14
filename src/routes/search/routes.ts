
import { Request, Response } from 'express';
import { getPlacesByName } from './SearchController';
import { checkSearchParams } from '../../middleware/checks';

interface ResType {
  hello?: boolean;
  search?: boolean;
}

const returnJson = (data : ResType) => async ({ query, params }: Request, res: Response) => {
  let result
  if(data.search) {
    result = await getPlacesByName(query.q);
  } else if(data.hello) {
    result = {
      serverName: 'typeScript API',
      message: 'welcome to the api',
      params,
      query
    };
  }

  res.status(200).send(result);
}

export default [
  {
    path: '/api/v1/hello',
    method: 'get',
    handler: [
      returnJson({hello: true})
    ]
  },
  {
    path: '/api/v1/search',
    method: 'get',
    handler: [
      checkSearchParams,
      returnJson({search: true})
    ]
  },

];