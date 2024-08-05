import React, { ChangeEvent, useCallback, useEffect } from "react";
import {
  Button,
  Checkbox,
  createStyles,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Paper,
  TextField,
  Theme,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import styled from "styled-components";
import "./index.css";
import { storageManager } from "./service/StorageManager";
import { Todo } from "./types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      maxWidth: 400,
      backgroundColor: theme.palette.background.paper,
      overflowY: "scroll",
    },
  })
);
export const App = () => {
  const classes = useStyles();
  const [textNewTodo, setTextNewTodo] = React.useState<string>("");
  const [todos, setTodos] = React.useState<Todo[]>([]);

  const getAllTodos = useCallback(async () => {
    await storageManager.getAll(setTodos);
  }, []);

  const handleToggle = useCallback(
    (id: number) => async () => {
      await storageManager.toggle(id);

      await getAllTodos();
    },
    []
  );

  const onSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (textNewTodo.trim() === "") return;
      await storageManager.add(textNewTodo);

      await getAllTodos();
      setTextNewTodo("");
    },
    [getAllTodos, textNewTodo]
  );

  const onDelete = useCallback(
    (id: number) => async () => {
      await storageManager.delete(id);

      await getAllTodos();
    },
    [getAllTodos]
  );

  const onTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTextNewTodo(event.currentTarget.value);
  };

  useEffect(() => {
    getAllTodos();
  }, [getAllTodos]);

  return (
    <div className="App">
      <div className="App-content">
        <h1>ЗАмечательные туду</h1>
        <StyledPaper elevation={3}>
          <form
            className="Form"
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
          >
            <div className="App-input">
              <TextField
                name="text"
                label="Новая туду"
                fullWidth
                onChange={onTextChange}
                value={textNewTodo}
              />
            </div>
            <Button variant="contained" color="primary" type="submit">
              Добавить туду
            </Button>
          </form>
          <List className={classes.root}>
            {todos.map((todo) => {
              const labelId = `checkbox-list-label-${todo.id}`;

              return (
                <ListItem
                  key={todo.id}
                  role={undefined}
                  dense
                  button
                  onClick={handleToggle(todo.id)}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={!todo.active}
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ "aria-labelledby": labelId }}
                    />
                  </ListItemIcon>
                  <ListItemText
                    className="ListItemText-color"
                    id={labelId}
                    primary={todo.text}
                  />
                  <ListItemSecondaryAction onClick={onDelete(todo.id)}>
                    <IconButton edge="end" aria-label="delete">
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              );
            })}
          </List>
        </StyledPaper>
      </div>
    </div>
  );
};

const StyledPaper = styled(Paper)`
  padding: 15px;
  width: 300px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;
