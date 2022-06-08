import { DragOutlined } from '@ant-design/icons';
import { List, Spin } from 'antd';
import { useEffect, useState } from 'react';
import ReactDragListView from 'react-drag-listview';

// Hooks
import type { TPerson } from '../hooks/usePeople';
import usePeople from '../hooks/usePeople';

const ListScreen: React.FC = () => {
  const [people, setPeople] = useState<TPerson[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { getPeople } = usePeople();

  useEffect(() => {
    getPeople()
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
    people: TPerson[],
    startIndex: number,
    endIndex: number
  ): TPerson[] => {
    const result = Array.from(people);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /*
    ON DRAG END EVENT HANDLER ACCEPTS:
      fromIndex: int, onDragStart index,
      toIndex: int, onDragEnd index,
      type: str, ReactDragListView Identifier,
      index: MUST be parent list index,
  */
  const onDragEnd = (fromIndex: number, toIndex: number) => {
    /* IGNORES DRAG IF OUTSIDE DESIGNATED AREA */
    if (toIndex < 0) return;

    const reorderedPeople = reorder(people, fromIndex, toIndex);
    return setPeople(reorderedPeople);
  };

  if (isLoading) {
    return <Spin size="large" />;
  }

  return (
    <ReactDragListView
      nodeSelector=".ant-list-item.draggable-item"
      lineClassName="dragLine"
      onDragEnd={onDragEnd}
    >
      <List
        size="small"
        bordered
        dataSource={people}
        renderItem={(item) => {
          return (
            <List.Item key={item.id} className="draggable-item">
              <DragOutlined className="icon" />
              <List.Item.Meta title={item.name} className="grabbable" />
            </List.Item>
          );
        }}
      />
    </ReactDragListView>
  );
};

export default ListScreen;
