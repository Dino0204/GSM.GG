export default function Champcard({ imgHref, desc, champ }) {
  return (
    <div className="relative flex flex-col justify-center items-center w-60 h-60 overflow-hidden">
      <img
        src={imgHref}
        alt={desc}
        className="
          transform transition-transform duration-300 ease-out rounded-3xl 
          object-cover scale-100 w-full h-full hover:scale-110
        "
      />
      <p className="absolute left-0 bottom-0">{champ}</p>
    </div>
  );
}
