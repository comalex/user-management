import { Button, Input, InputNumber, Modal, Space, Typography } from 'antd';
import { useState } from 'react';

// Helpers
import { showErrorNotification } from '../helpers/notification';
// Hooks
import type { TPersonServer } from '../hooks/usePeople';
import usePeople from '../hooks/usePeople';

type TAddPersonModalProps = {
  isVisible: boolean;
  onClose: () => void;
  onSave: (person: TPersonServer) => void;
};

const AddPersonModal: React.FC<TAddPersonModalProps> = ({
  isVisible,
  onClose,
  onSave,
}) => {
  const [personName, setPersonName] = useState<string>('');
  const [personRank, setPersonRank] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { createPerson } = usePeople();

  const onOkClick = () => {
    if (personName === '') {
      showErrorNotification('Person name should not be empty');
      return;
    }
    setIsLoading(true);
    createPerson({ name: personName, rank: personRank })
      .then((person) =>
        onSave({ id: person.id, name: person.name, rank: person.rank })
      )
      .finally(() => {
        setPersonName('');
        setPersonRank(1);
        setIsLoading(false);
      });
  };

  const onCancelClick = () => {
    setPersonName('');
    setPersonRank(1);
    onClose();
  };

  return (
    <Modal
      title="Add Person"
      visible={isVisible}
      onOk={onOkClick}
      onCancel={onCancelClick}
      footer={[
        <Button
          key="submit"
          type="primary"
          loading={isLoading}
          onClick={onOkClick}
        >
          Save
        </Button>,
      ]}
    >
      <Space direction="vertical" size={24} style={{ width: '100%' }}>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography>
            <Typography.Text>Name</Typography.Text>
          </Typography>
          <Input
            type="text"
            placeholder="Enter person name"
            value={personName}
            onChange={(evt) => setPersonName(evt.target.value)}
          />
        </Space>
        <Space direction="vertical" size={8} style={{ width: '100%' }}>
          <Typography>
            <Typography.Text>Rank</Typography.Text>
          </Typography>
          <InputNumber
            style={{ width: '100%' }}
            min={1}
            placeholder="Person rank"
            value={personRank}
            onChange={setPersonRank}
          />
        </Space>
      </Space>
    </Modal>
  );
};

export default AddPersonModal;
