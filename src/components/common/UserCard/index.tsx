import { FC } from "react";

import "./styles.scss";

interface IUserCardProps {
  name: string;
  photo: string;
  email: string;
}

const UserCard: FC<IUserCardProps> = ({ name, photo, email }) => {
  return (
    <div className="user-card">
      <img className="user-card__photo" src={photo} />
      {name && <p className="user-card__name">{name}</p>}
      {email && <p className="user-card__email">{email}</p>}
    </div>
  );
};

export default UserCard;
