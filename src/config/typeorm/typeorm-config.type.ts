export interface TypeormConfig {
  typeorm: {
    port: number;
    host: string;
    username: string;
    password: string;
    db: string;
    synchronize: boolean;
    logging: boolean;
  };
}
