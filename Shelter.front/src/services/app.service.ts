import axios, { AxiosRequestConfig } from 'axios';
import { buildPatchModifierPayload } from './patchHelper';
import { SearchForElementsApiModel } from '@/objects/apiModels/SearchForElementsApiModel';
import { Element } from '@/objects/Element';
import { SaveElementApiModel } from '@/objects/apiModels/SaveElementApiModel';
import { Tag } from '@/objects/Tag';
import { LoginApiModel } from '@/objects/apiModels/LoginApiModel';
import { LoginResult } from '@/objects/LoginResult';
import { SearchForTagsApiModel } from '@/objects/apiModels/SearchForTagsApiModel';

export default class AppService {
  private serviceRootUrl: string;
  constructor() {
    axios.defaults.baseURL = '/';
    axios.interceptors.request.use(this.axiosInterceptor);
    this.serviceRootUrl = process.env.VUE_APP_APIURL;
  }
  public axiosInterceptor = (config: AxiosRequestConfig) => {
    if (typeof window === 'undefined') {
      return config;
    }
    const token = window.localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  };

  public searchForElements(
    searchForElementsApiModel: SearchForElementsApiModel
  ): Promise<Element[]> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.serviceRootUrl}/elements`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }

  public createElement(elementCreationApiModel: SaveElementApiModel) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serviceRootUrl}/elements`, elementCreationApiModel)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }

  public updateElement(saveElementApiModel: SaveElementApiModel) {
    return new Promise<Element>((resolve, reject) => {
      const patchModel = saveElementApiModel.buildPatchModel();
      axios
        .patch(
          `${this.serviceRootUrl}/elements/${saveElementApiModel.id}`,
          patchModel
        )
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }
  public getElementById(elementId: number): Promise<Element> {
    return new Promise((resolve, reject) => {
      axios
        .get(`${this.serviceRootUrl}/elements/${elementId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }
  public deleteElement(elementId: number) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.serviceRootUrl}/elements/${elementId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }
  public login(credentials: LoginApiModel): Promise<LoginResult> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serviceRootUrl}/auth/login`, credentials)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }
  public searchForTags(model: SearchForTagsApiModel): Promise<Tag[]> {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serviceRootUrl}/tags/search`, {
          labelSearchText: model.labelSearchText,
          limit: model.labelSearchText ? 10 : 10000
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }

  public deleteTag(tagId: number) {
    return new Promise((resolve, reject) => {
      axios
        .delete(`${this.serviceRootUrl}/tags/${tagId}`)
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }
  public replaceTagLabel(tagId: number, newLabel: string) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${this.serviceRootUrl}/tags`, {
          tagId,
          newLabel
        })
        .then(response => {
          resolve(response.data);
        })
        .catch(error => {
          reject(error.response.data.message);
        });
    });
  }
}
