import React, {useContext, useState} from "react";
import {axiosWithAuth} from "../utils/AxiosWithAuth";
import {BubbleContext} from "../contexts/BubbleContext";

const initialColor = {
    color: "",
    code: {hex: "#"}
};

const ColorList = () => {
    const [editing, setEditing] = useState(false);
    const [adding, setAdding] = useState(false);
    const [colorToEdit, setColorToEdit] = useState(initialColor);
    const [colorToAdd, setColorToAdd] = useState(initialColor);
    const {colorList, setColorList} = useContext(BubbleContext);

    const editColor = color => {
        setEditing(true);
        setColorToEdit(color);
    };

    const addColor = e =>{
        e.preventDefault();
        axiosWithAuth()
            .post(`http://localhost:5000/api/colors/`, colorToAdd)
            .then(res =>{
                setColorList(res.data);
                setAdding(false);
                console.log(res.data);
            })
            .catch(err =>{
                console.log("Error saving color: ", err);
                console.log("Color tried to save: ", colorToEdit);
            });
    }

    const saveEdit = e => {
        e.preventDefault();
        // Make a put request to save your updated color
        // think about where will you get the id from...
        // where is is saved right now?
        axiosWithAuth()
            .put(`http://localhost:5000/api/colors/${colorToEdit.id}`, colorToEdit)
            .then(res =>{
                const newColors = colorList.map(color =>{
                    if(color.id === colorToEdit.id) return colorToEdit;
                    else return color;
                });
                setColorList([...newColors]);
                setEditing(false);
            })
            .catch(err =>{
                console.log("Error saving color: ", err);
                console.log("Color tried to save: ", colorToEdit);
            });
    };

    const deleteColor = color => {
        // make a delete request to delete this color
        axiosWithAuth()
            .delete(`http://localhost:5000/api/colors/${color.id}`)
            .then(res =>{
                const newColors = colorList.filter(filterColor=> filterColor.id !== color.id);
                setColorList(newColors);
            })
            .catch(err =>{
                console.log("Error deleting color: ", err);
            });
    };

    return (
        <div className="colors-wrap">
            <p>colors</p>
            <ul>
                {colorList.map(color => (
                    <li key={color.color}
                        onClick={() => editColor(color)}>{/*this on click is called when a color is clicked*/}
                        <span>
              <span className="delete" onClick={e => {
                  e.stopPropagation();
                  deleteColor(color);
              }
              }>
                  x
              </span>{" "}
                            {color.color}
            </span>
                        <div
                            className="color-box"
                            style={{backgroundColor: color.code.hex}}
                        />
                    </li>
                ))}
            </ul>
            {editing && (
                <form onSubmit={saveEdit}>
                    <legend>edit color</legend>
                    <label>
                        color name:
                        <input
                            onChange={e =>
                                setColorToEdit({...colorToEdit, color: e.target.value})
                            }
                            value={colorToEdit.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={e =>
                                setColorToEdit({
                                    ...colorToEdit,
                                    code: {hex: e.target.value}
                                })
                            }
                            value={colorToEdit.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setEditing(false)}>cancel</button>
                    </div>
                </form>
            )}

            {adding ? (
                <form onSubmit={addColor}>
                    <legend>add color info</legend>
                    <label>
                        color name:
                        <input
                            onChange={e =>
                                setColorToAdd({...colorToAdd, color: e.target.value})
                            }
                            value={colorToAdd.color}
                        />
                    </label>
                    <label>
                        hex code:
                        <input
                            onChange={e =>
                                setColorToAdd({
                                    ...colorToAdd,
                                    code: {hex: e.target.value}
                                })
                            }
                            value={colorToAdd.code.hex}
                        />
                    </label>
                    <div className="button-row">
                        <button type="submit">save</button>
                        <button onClick={() => setAdding(false)}>cancel</button>
                    </div>
                </form>
            ) : <button onClick={() => {setAdding(true)}}>Add Color</button>}
            <div className="spacer"/>
            {/* stretch - build another form here to add a color */}
        </div>
    );
};

export default ColorList;
