import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

interface IForm {
  toDo: string;
}

const Input = styled.input`
  width: 80vw;
  height: 50px;
  border-radius: 25px;
  border: none;
  font-size: 30px;
  text-align: center;
  background-color: ${(props) => props.theme.accentColor};
  color: ${(props) => props.theme.textColor};
  ::placeholder {
    color: black;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 50px;
  border-radius: 75px;
  background: linear-gradient(90deg, #ffffff 10%, rgba(48, 58, 99, 1) 100%);
  margin-left: 10px;
`;

const Form = styled.form`
  width: 100vw;
  height: 20vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 20px;
`;

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <Form onSubmit={handleSubmit(handleValid)}>
      <Input
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <Button>Add</Button>
    </Form>
  );
}

export default CreateToDo;
