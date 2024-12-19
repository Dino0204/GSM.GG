export default function Champcard({ id, name, title, splashImage, alt }) {
  return (
    <div
      className={`relative flex flex-col justify-center items-center w-80 h-52 overflow-hidden rounded-3xl `}
    >
      <img
        src={splashImage}
        alt={alt}
        className="
          transform transition-transform duration-300 ease-out  
          object-cover scale-100 w-full h-full hover:scale-110 
        "
      />
      {title && (
        <div className="absolute flex items-center justify-center top-0 w-full h-max bg-[rgba(0,0,0,0.5)]">
          <p>{title}</p>
        </div>
      )}
      <div className="absolute flex items-center justify-center bottom-0 w-full h-max bg-[rgba(0,0,0,0.5)]">
        <p>{name}</p>
      </div>
    </div>
  );
}
