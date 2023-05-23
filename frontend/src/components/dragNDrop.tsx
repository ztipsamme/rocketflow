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

    // setWidgetsTodo(widgetsTodo.splice(widgetsTodo.indexOf(todoType), 1));
    // setWidgetsTodo(widgetsTodo.splice(0, 1));
    // setWidgetsTodo([...widgetsTodo.splice(widgetsTodo.indexOf(todoType), 1)]);

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

    // setWidgets(widgets.splice(widgets.indexOf(todoType), 1));
    // console.log(widgets)


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

           {/* HTML för To-Do List */}
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


          {/* HTML för Today */}
          <form className="box2" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
            <h3 className="heading">Today</h3>
            <div>{widgets.map((task, index) => (
              <p className='dropped-widget task' draggable onDragStart={(event) => handleOnDrag(event, task)} key={index}>
                {task}
              </p>
                ))}

          </div>

          </form>
          {/* HTML för Done */}
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




// return (
//   <>
//     <div className='container'>
//       <div className='box2'>
//       <h3 className="heading">TO-Do list</h3>
//         <div className='task' draggable onDragStart={(e) => handleOnDrag(e, "Collect data")}>
//         Collect data
//         </div>
//       </div>

//       <div className='box2'>
//         <div className='task' draggable onDragStart={(e) => handleOnDrag(e, "analyse answers")}>
//         analyse answers
//         </div>
//       </div>


//       <div className='box2'>
//         <div className='task' draggable onDragStart={(e) => handleOnDrag(e, "Check emails")}>
//         Check emails
//         </div>
//       </div>

//       <div className='box2'>

//         <div className='task' draggable onDragStart={(e) => handleOnDrag(e, "Send wirefrane")}>
//         Send wirefrane
//         </div>
//       </div>

//       <div className='box2'>
//         <div className='task' draggable onDragStart={(e) => handleOnDrag(e, "Call vice pres.")}>
//         Call vice pres.
//         </div>
//       </div>


//         <div className="box2">
//           <h3 className="heading" onDrag={handlOnDrag} onDragOver={handleOnDragOver}>Today</h3>
//         </div>

//         <div className="box2">
//           <h3 className="heading">Done</h3>
//         </div>
//       </div>




// </>
// )
// }

      {/* HTML för To-Do list */}
          {/* <form className="box2">

            <h3 className="heading">To-Do list</h3>

            <p className="task" draggable onDragStart={(event) => handleOnDrag(event, "Collect data")}>
              Collect data
                    </p>
                    <p className="task"  draggable onDragStart={(event) => handleOnDrag(event, "Choose fonts")}>
                        Choose fonts
                    </p>
                    <p className="task" draggable onDragStart={(event) => handleOnDrag(event, "Create ad")}>
                        Create ad
                    </p>
                    <p className="task" draggable onDragStart={(event) => handleOnDrag(event, "Write final copy")}>
                        Write final copy
                    </p>

                    <button className="btn btn-primary">New Task</button>
          </form> */}



{/* <form className="box2">
<h3 className="heading">Today</h3> */}
{/*
<p className="task" draggable onDragStart={(e) => handleOnDrag(e, "Collect data")}>>
    Collect data
</p>
<p className="task" draggable onDragStart={(e) => handleOnDrag(e, "Analyse answers")}>>
    analyse answers
</p>
<p className="task" draggable onDragStart={(e) => handleOnDrag(e, "Check emails")}>
    Check emails
</p>
<p className="task" draggable onDragStart={(e) => handleOnDrag(e, "Send Wireframe")}>
    Send wirefrane
</p>
<p className="task" draggable onDragStart={(e) => handleOnDrag(e, "Call vice pres")}>
    Call vice pres.
</p> */}
{/* </form> */ }







// Done:

{/* <form className="box2">
<h3 className="heading">Done</h3> */}
{/*
<p className="task"
    Send skiss
</p>
<p className="task" draggable="true">
    check emails
</p>
<p className="task" draggable="true">
    Do Style guide
</p>
<p className="task" draggable="true">
    Moodboard
</p>
<p className="task" draggable="true">
    Call President
</p>
<p className="task" draggable="true">
    Write interview
</p>
<p className="task" draggable="true">
    Write survey
</p> */}
// </form>
