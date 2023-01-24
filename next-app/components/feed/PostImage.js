import Image from 'next/image'

const style = {
  wrapper: `feed-photo-container flex relative items-center`,
  imageContainer: `feed-photo-images-container w-full relative transition ease-linear duration-200 flex-1 flex h-[500px] w-[500px] m-auto`,
  image: `object-cover h-full w-full`,
};

const PostImage = ({ imgUrl }) => {
    return (
      <div className={style.wrapper}>
        <div className={style.imageContainer}>
                <img className={style.image} src={imgUrl} />
        </div>
      </div>
    );
}

export default PostImage
