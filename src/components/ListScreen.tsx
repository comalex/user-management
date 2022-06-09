import { LogoutOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Col, List, Row, Space, Spin } from 'antd';
import { useContext, useEffect, useState } from 'react';
import ReactDragListView from 'react-drag-listview';

// Context
import AuthContext from '../context/auth';
// Types
import type { TPerson, TPersonServer } from '../hooks/usePeople';
// Hooks
import usePeople from '../hooks/usePeople';

// Components
import AddPersonModal from './AddPersonModal';
import ListItem from './ListItem';

const ListScreen: React.FC = () => {
  const [people, setPeople] = useState<TPersonServer[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { getPeople, updatePerson } = usePeople();
  const { handleUserSignOut } = useContext(AuthContext);

  useEffect(() => {
    getPeople()
      .then((people) =>
        Array.isArray(people)
          ? people.sort((a: TPerson, b: TPerson) => a.rank - b.rank)
          : []
      )
      .then(setPeople)
      .finally(() => setIsLoading(false));
  }, []);

  /*
    REORDER ACCEPTS:
      list: arr, accepts array of data to be reordered,
      fromIndex: int, onDragStart index,
      toIndex: int, onDragEnd index,
  */
  const reorder = (
    people: TPersonServer[],
    startIndex: number,
    endIndex: number
  ): void => {
    const [draggedItem] = people.slice(startIndex, startIndex + 1);

    let itemsToUpdate: TPersonServer[] = [];
    let updatedPeopleList: TPersonServer[] = [];
    const isRankUp = endIndex <= startIndex;
    if (isRankUp) {
      const peopleToLower = people
        .slice(endIndex, startIndex)
        .map((person) => ({ ...person, rank: person.rank + 1 }));
      const personToUpper = { ...draggedItem, rank: endIndex + 1 };
      itemsToUpdate = [personToUpper, ...peopleToLower];
      updatedPeopleList = [
        ...people.slice(0, endIndex),
        ...itemsToUpdate,
        ...people.slice(startIndex + 1),
      ];
    } else {
      const peopleToUpper = people
        .slice(startIndex + 1, endIndex + 1)
        .map((person) => ({ ...person, rank: person.rank - 1 }));
      const personToLower = { ...draggedItem, rank: endIndex + 1 };
      itemsToUpdate = [...peopleToUpper, personToLower];
      updatedPeopleList = [
        ...people.slice(0, startIndex),
        ...itemsToUpdate,
        ...people.slice(endIndex + 1),
      ];
    }

    itemsToUpdate.map((person) =>
      updatePerson(person.id, { name: person.name, rank: person.rank })
    );
    setPeople(updatedPeopleList);
  };

  const onDragEnd = (fromIndex: number, toIndex: number): void => {
    /* IGNORES DRAG IF OUTSIDE DESIGNATED AREA */
    if (toIndex < 0) {
      return;
    }
    reorder(people, fromIndex, toIndex);
  };

  const onItemUpdate = (newPerson: TPersonServer): void => {
    const updatedPersonIndex = people.findIndex(
      (person) => person.id === newPerson.id
    );
    const updatedPeople = [
      ...people.slice(0, updatedPersonIndex),
      newPerson,
      ...people.slice(updatedPersonIndex + 1),
    ];
    setPeople(updatedPeople);
  };

  const onItemDelete = (person: TPersonServer): void => {
    const updatedPeople = people.filter((p) => p.id !== person.id);
    setPeople(updatedPeople);
  };

  const onItemAdd = (person: TPersonServer): void => {
    const newPeople = [...people, person];
    const sortedPeople = newPeople.sort(
      (a: TPerson, b: TPerson) => a.rank - b.rank
    );
    setPeople(sortedPeople);
  };

  const onAddPersonClick = () => {
    setIsModalVisible(true);
  };

  const onSignOutClick = () => {
    if (handleUserSignOut) {
      handleUserSignOut();
    }
  };

  if (isLoading) {
    return (
      <Row align="middle" justify="center">
        <Col>
          <Spin size="large" />
        </Col>
      </Row>
    );
  }

  return (
    <>
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Row justify="space-between">
          <Col>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={onAddPersonClick}
            >
              Add person
            </Button>
          </Col>
          <Col>
            <Button
              danger
              type="primary"
              icon={<LogoutOutlined />}
              onClick={onSignOutClick}
            >
              Sign Out
            </Button>
          </Col>
        </Row>
        <ReactDragListView
          nodeSelector=".ant-list-item.draggable-item"
          lineClassName="dragLine"
          onDragEnd={onDragEnd}
        >
          <List
            size="small"
            bordered
            dataSource={people}
            renderItem={(item) => (
              <ListItem
                key={item.id}
                person={item}
                onItemUpdate={onItemUpdate}
                onItemDelete={onItemDelete}
              />
            )}
          />
        </ReactDragListView>
      </Space>
      <AddPersonModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={(person: TPersonServer) => {
          onItemAdd(person);
          setIsModalVisible(false);
        }}
      />
    </>
  );
};

export default ListScreen;
