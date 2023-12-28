import { AuthCredentialsDto } from '../dto/auth-credential.dto';

export interface CreatorInterface {
  create(data: AuthCredentialsDto): any;
}

export interface ReaderInterface {
  read(
    /*ID값 또는 검색을 위한 쿼리스트링 속성*/
    identityData: string,
    size?: number,
    page?: number,
  ): any;
}

export interface UpdaterInterface {
  update(data: any, id: string | string[]): any;
}

export interface DeleterInterface {
  delete(id: string | string[]): any;
}
