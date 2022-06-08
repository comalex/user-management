import { API } from 'aws-amplify';
import { nanoid } from 'nanoid';

import { showErrorNotification } from '../helpers/notification';

export type TPerson = {
  id: string;
  name: string;
  rank: number;
};

const usePeople = () => {
  const API_NAME = 'peopleApi';
  const API_PATH = '/people';
  const API_PARTIAL_KEY = 'id';

  const createPerson = (person: TPerson): Promise<any> => {
    return API.post(API_NAME, API_PATH, {
      body: {
        ...person,
        id: nanoid(),
      },
    }).catch((err) => {
      if (typeof err === 'string') {
        showErrorNotification(err);
      } else if (err.message && typeof err.message === 'string') {
        showErrorNotification(err.message);
      } else {
        showErrorNotification('Unknown error');
      }
      return err;
    });
  };

  const getPeople = (): Promise<any> => {
    return API.get(API_NAME, `${API_PATH}/${API_PARTIAL_KEY}`, {}).catch(
      (err) => {
        if (typeof err === 'string') {
          showErrorNotification(err);
        } else if (err.message && typeof err.message === 'string') {
          showErrorNotification(err.message);
        } else {
          showErrorNotification('Unknown error');
        }
        return err;
      }
    );
  };

  const getPerson = (id: string): Promise<any> => {
    return API.get(API_NAME, `${API_PATH}/${id}`, {}).catch((err) => {
      if (typeof err === 'string') {
        showErrorNotification(err);
      } else if (err.message && typeof err.message === 'string') {
        showErrorNotification(err.message);
      } else {
        showErrorNotification('Unknown error');
      }
      return err;
    });
  };

  const updatePerson = (id: string, person: Partial<TPerson>): Promise<any> => {
    return API.patch(API_NAME, `${API_PATH}/${id}`, {
      body: {
        ...person,
      },
    }).catch((err) => {
      if (typeof err === 'string') {
        showErrorNotification(err);
      } else if (err.message && typeof err.message === 'string') {
        showErrorNotification(err.message);
      } else {
        showErrorNotification('Unknown error');
      }
      return err;
    });
  };

  const deletePerson = (id: string): Promise<any> => {
    return API.del(API_NAME, `${API_PATH}/${id}`, {}).catch((err) => {
      if (typeof err === 'string') {
        showErrorNotification(err);
      } else if (err.message && typeof err.message === 'string') {
        showErrorNotification(err.message);
      } else {
        showErrorNotification('Unknown error');
      }
      return err;
    });
  };

  return { createPerson, deletePerson, getPeople, getPerson, updatePerson };
};

export default usePeople;
