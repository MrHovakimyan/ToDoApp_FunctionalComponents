// under development...
function DragDrop({ handleDragStart, handleDragEnd, handleDragOver }) {
  ///const draggables = document.querySelectorAll(".draggable");
  //console.log("draggables", draggables);
  // draggables.forEach((draggable) => {
  //   draggable.addEventListener("onDragStart", handleDragStart);
  //   draggable.addEventListener("dragend", handleDragEnd);
  //   draggable.addEventListener("dragover", handleDragOver);
  // });

  ondragstart = () => {
    handleDragStart = (evn) => {
      // evn.target.classList.add("dragging");
      console.log("drag starts", evn.target);
    };
  };
  handleDragEnd = (evn) => {
    console.log("drag end");
  };

  handleDragOver = () => {
    console.log("dragOver");
  };
}

export default DragDrop;
