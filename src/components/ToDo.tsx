import { useForm } from "react-hook-form";
import { Categories, IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Text = styled.span`
  font-size: 38px;
  color: ${(props) => props.theme.accentColor};
  margin-right: 20px;
`;

const Li = styled.li`
  list-style-type: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIndex];
      const newToDo = { text, id, category: name as any };
      console.log(oldToDo, newToDo);
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  const onDelete = (event: React.MouseEvent<HTMLButtonElement>) => {
    setToDos((oldToDos) => {
      const toDo = oldToDos.filter((todo) => todo.id !== id);
      return toDo;
    });
  };

  return (
    <Li>
      <Text>{text}</Text>
      {category !== Categories.DOING && (
        <button name={Categories.DOING + ""} onClick={onClick}>
          DOING
        </button>
      )}
      {category !== Categories.TO_DO && (
        <button name={Categories.TO_DO + ""} onClick={onClick}>
          TO DO
        </button>
      )}
      {category !== Categories.DONE && (
        <button name={Categories.DONE + ""} onClick={onClick}>
          DONE
        </button>
      )}
      <button onClick={onDelete}>Delete</button>
    </Li>
  );
}

export default ToDo;
