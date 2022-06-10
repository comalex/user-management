import { DragOutlined, CloseOutlined, CheckOutlined } from '@ant-design/icons';
import { Button, Dropdown, Input, List, Tag } from 'antd';
import { useState } from 'react';

// Types
import type { TPersonServer } from '../hooks/usePeople';
import usePeople from '../hooks/usePeople';

// Components
import ActionMenu from './ActionMenu';

type TListItemProps = {
  person: TPersonServer;
  onItemUpdate: (newPerson: TPersonServer) => void;
  onItemDelete: (newPerson: TPersonServer) => void;
};

const ListItem: React.FC<TListItemProps> = ({
  person,
  onItemUpdate,
  onItemDelete,
}) => {
  const { updatePerson } = usePeople();

  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [personName, setPersonName] = useState<string>(person.name);

  const editSubmitHandler = () => {
    setIsLoading(true);
    updatePerson(person.id, { name: personName, rank: person.rank })
      .then(() => onItemUpdate({ ...person, name: personName }))
      .then(() => setIsEditMode(false))
      .finally(() => setIsLoading(false));
  };

  const editCloseHandler = () => {
    setIsEditMode(false);
    setPersonName(person.name);
  };

  return (
    <List.Item
      className="draggable-item"
      actions={[
        <Dropdown.Button
          type="text"
          overlay={
            <ActionMenu
              person={person}
              onEdit={() => setIsEditMode(true)}
              onDelete={() => onItemDelete(person)}
            />
          }
          trigger={['click']}
        />,
      ]}
    >
      <DragOutlined className="icon" />
      <Tag color="green"># {person.rank}</Tag>
      {isEditMode ? (
        <Input.Group compact>
          <Input
            style={{ width: 'calc(100% - 65px)' }}
            defaultValue={personName}
            placeholder="Input person name"
            onChange={(e) => setPersonName(e.target.value)}
          />
          <Button
            loading={isLoading}
            type="primary"
            onClick={editSubmitHandler}
            icon={<CheckOutlined />}
          />
          <Button
            type="ghost"
            danger
            onClick={editCloseHandler}
            icon={<CloseOutlined />}
          />
        </Input.Group>
      ) : (
        <List.Item.Meta title={person.name} className="grabbable" />
      )}
    </List.Item>
  );
};

export default ListItem;
