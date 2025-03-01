import { api } from 'shared/appApi';

const paths = [
  ['kpgz', ['id', 'name']],
  ['cte', ['id', 'name', 'kpgz_id']],
  ['order', ['id', 'id_cte', 'count', 'price', 'oferta_price']]
]

export const testReportApi = {
  getData: async () => {
    const responses = []
    for (const tableName in paths) {

    }
  }
}