import { SelectProps } from 'antd';

import { api } from 'shared/appApi';
import { DBTableColumnNames } from 'entities/Property/config/DBTableColumnNames';

const urls = {
  base: '/properties',
};

export const propertiesApi = {
  get: async () => {
    const { data: properties } = await api.get<Record<string, string[]>[]>(
      urls.base,
    );

    const result: SelectProps['options'] = [];
    properties.forEach((prop) => {
      const tableName = Object.keys(prop)[0];
      prop[tableName].forEach((columnName) => {
        const tableColumnName = `${tableName}.${columnName}`;
        const label =
          DBTableColumnNames[
            tableColumnName as keyof typeof DBTableColumnNames
          ];
        if (label) {
          result.push({
            label,
            value: tableColumnName,
          });
        }
      });
    });
    return result;
  },
};
