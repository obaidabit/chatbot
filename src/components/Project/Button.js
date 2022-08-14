function Button(props){
  return(
    <>
    <style>
      {`.PProject a{
                display: block;
                padding: 15px 10px;
                width: fit-content;
                margin: 0 auto;
                border: 1px solid var(--section-color);
                color: var(--section-color);
                cursor: pointer;
                margin-top: 100px;
                transition : var(--main-transition)
      }
      .PProject a:hover{
        background : var(--section-color);
        color : var(--secondary-color);
      }
      `}
    </style>
      <a href="#">{props.text}</a>
    </>
  )
}
export default Button