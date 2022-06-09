import { API } from 'aws-amplify';

import { showErrorNotification } from '../helpers/notification';

export type TPerson = {
  name: string;
  rank: number;
};

export type TPersonServer = TPerson & {
  id: string;
};

const usePeople = () => {
  const API_NAME = 'peopleApi';
  const API_PATH = '/people';

  const createPerson = (person: TPerson): Promise<any> => {
    return API.post(API_NAME, API_PATH, {
      body: person,
    })
      .then((res) => JSON.parse(res.body))
      .catch((err) => {
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
    return API.get(API_NAME, API_PATH, {})
      .then((res) => JSON.parse(res.body))
      .catch((err) => {
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

  const getPerson = (id: string): Promise<any> => {
    return API.get(API_NAME, `${API_PATH}/${id}`, {})
      .then((res) => JSON.parse(res.body))
      .catch((err) => {
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

  const updatePerson = (
    id: string,
    person: Partial<TPersonServer>
  ): Promise<any> => {
    return API.put(API_NAME, API_PATH, {
      body: {
        ...person,
        id,
      },
    })
      .then((res) => JSON.parse(res.body))
      .catch((err) => {
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
    return API.del(API_NAME, `${API_PATH}/${id}`, {})
      .then((res) => JSON.parse(res.body))
      .catch((err) => {
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
