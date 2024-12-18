export default function Champcard({ imgHref, desc, champ, title }) {
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
      <p className="absolute">{title}</p>
      <div className="absolute flex items-center justify-center bottom-0 w-full h-max bg-[rgba(0,0,0,0.5)]">
        <p>{champ}</p>
      </div>
    </div>
  );
}
