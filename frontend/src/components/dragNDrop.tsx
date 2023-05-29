import React, { useState } from 'react'

import '../assets/styles/drag-n-drop.css'

//Den här funktion tar drag event och dataTransfer(dataöverföring)där kan man lägga till egenskaper och setdata till event så man kan hålla reda på vilken data som är kopplade till den.
function DragNdrop() {

  const [widgets, setWidgets] = useState<string[]>([]);

  const [widgetsDone, setWidgetsDone] = useState<string[]>([]);

  const [widgetsTodo, setWidgetsTodo] = useState<string[]>(["style guide", "Choose fonts", "Create ad", "Write final copy", " Collect data","analyse answers", "Check emails","Send wirefrane","Call vice pres", "Send skiss","Write interview","Write survey"]);

  function handleOnDrag(event: React.DragEvent, todoType: string) {

    event.dataTransfer.setData("todoType", todoType);

  }
  //Här använder den drop för att släppa widgets i släppområden fler i today

  function handleOnDrop(event: React.DragEvent) {

    const todoType = event.dataTransfer.getData("todoType") as string;

    console.log("today", todoType);

    setWidgets([...widgets, todoType])
    console.log(widgetsTodo.indexOf(todoType))

    console.log(widgetsTodo)
    const index = widgetsTodo.indexOf(todoType);

    setWidgetsTodo([...widgetsTodo.slice(0, index), ...widgetsTodo.slice(index + 1, widgetsTodo.length)]);

    console.log(widgetsTodo)

  }


//Här använder den drop för att släppa widgets i släppområden för Done
  function handleOnDropDone(event: React.DragEvent) {

    const todoType = event.dataTransfer.getData("todoType") as string;

    console.log("done", todoType);

    setWidgetsDone([...widgetsDone, todoType]);


    // setWidgets([...(widgets.splice(widgets.indexOf(todoType), 1))]);
    // setWidgets(["dsds", "dsdsdsds"])
    // console.log([...widgets.splice(widgets.indexOf(todoType), 1)])

    const index = widgets.indexOf(todoType);

    setWidgets([...widgets.slice(0, index), ...widgets.slice(index + 1, widgets.length)]);
  }



  function handleOnDropTodo(event: React.DragEvent) {
    const todoType = event.dataTransfer.getData("todoType") as string;
    console.log("todo", todoType);
    setWidgetsTodo([...widgetsTodo, todoType]);

    console.log([...widgets.splice(widgets.indexOf(todoType), 1)])

    setWidgets(widgets.splice(widgets.indexOf(todoType), 1));
  }

  function handleOnDragOver(event: React.DragEvent) {
    event.preventDefault();
    console.log('drag over');
  }

  return (
    <>
      <div className="container">
        <div className="box">

           {/* kod för To-Do List */}
          <form className="box2" onDrop={handleOnDropTodo} onDragOver={handleOnDragOver}>
          <button className="btn btn-primary">New Task</button>
            <h3 className="heading">To-Do List</h3>
            <div>{widgetsTodo.map((task, index) => (
            <p className='dropped-widget task' draggable onDragStart={(event) => handleOnDrag(event, task)} key={index}>
                {task}
              </p>
            ))}

            </div>
          </form>


          {/* kod för Today */}
          <form className="box2" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
            <h3 className="heading">Today</h3>
            <div>{widgets.map((task, index) => (
              <p className='dropped-widget task' draggable onDragStart={(event) => handleOnDrag(event, task)} key={index}>
                {task}
              </p>
                ))}

          </div>

          </form>
          {/* kod för Done */}
          <form className="box2" onDrop={handleOnDropDone} onDragOver={handleOnDragOver}>
            <h3 className="heading">Done</h3>
            <div>{widgetsDone.map((task, index) => (
            <p className='dropped-widget task' key={index}>
              {task}

                  </p>
                ))}

                </div>
          </form>
        </div>
      </div>
    </>
)
}
export default DragNdrop
