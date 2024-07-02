export enum RabbitMQ{
  ServicesQueue = 'services',
  
}

export enum ServicesMSG {
  CREATE = 'CREATE_SERVICES',
  FIND_ALL =  'FIND_SERVICES',
  FIND_ONE = 'FIND_SERVICE',
  UPDATE = 'UPDATE_SERVICE',
  DELETE = 'DELETE_SERVICE',
  GET_AVAILABLE_HOURS = 'GET_AVAILABLE_HOURS',
  FIND_TOP_REQUESTED = 'FIND_TOP_REQUESTED',
  GET_TOTAL_SALES = 'GET_TOTAL_SALES',
  GET_MONTHLY_SALES = 'GET_MONTHLY_SALES',
  GET_ANNUAL_SALES = 'GET_ANNUAL_SALES',
  GET_TOP_SERVICES = 'GET_TOP_SERVICES',
}