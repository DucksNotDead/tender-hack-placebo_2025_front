import { DBTableColumnNames } from 'entities/Property/config/DBTableColumnNames';

export function getPropertyLabels(
  propertyTableColumnNames: string[],
): string[] {
  return propertyTableColumnNames
    .map((name) => DBTableColumnNames[name as keyof typeof DBTableColumnNames])
    .filter((name) => !!name);
}
