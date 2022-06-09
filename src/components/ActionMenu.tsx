import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

// Types
import type { TPersonServer } from '../hooks/usePeople';
import usePeople from '../hooks/usePeople';

type TActionMenuProps = {
  person: TPersonServer;
  onEdit: () => void;
  onDelete: () => void;
};

const ActionMenu: React.FC<TActionMenuProps> = ({
  person,
  onEdit,
  onDelete,
}) => {
  const { deletePerson } = usePeople();

  const onDeleteClick = () => {
    deletePerson(person.id).then(() => onDelete());
  };

  return (
    <Menu
      items={[
        {
          icon: <EditOutlined />,
          key: '1',
          label: 'Edit',
          onClick: onEdit,
        },
        {
          danger: true,
          icon: <DeleteOutlined />,
          key: '2',
          label: 'Delete',
          onClick: onDeleteClick,
        },
      ]}
    />
  );
};

export default ActionMenu;
