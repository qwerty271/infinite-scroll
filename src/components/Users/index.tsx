import React from "react";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useFetchList } from "../../hooks";
import { Loader, UserCard } from "../common";

import "./styles.scss";
import { IUserResults } from "./types";

const Users: FC = () => {
  const [page, setPage] = useState<number>(0);
  const { isloading, isError, list } = useFetchList<IUserResults>(
    "https://randomuser.me/api",
    "results=20&inc=name,email,login,picture",
    page
  );

  /** Ref points to draw loader */
  const loaderRef = useRef(null);

  /** Function-observer that defines a new page */
  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const target = entries[0];
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0,
    };
    const observer = new IntersectionObserver(handleObserver, option);
    if (loaderRef.current) observer.observe(loaderRef.current);
  }, [handleObserver]);

  /**
   * Render users cards list
   * @returns {JSX.Element}
   */
  const getUserList = useMemo(
    () => (
      <div className="users__cards-container">
        {list?.map((user: IUserResults) => {
          const name = `${user?.name?.first} ${user?.name?.last}`;
          return (
            <UserCard
              name={name}
              photo={user?.picture?.large}
              email={user?.email}
              key={user?.login?.uuid}
            />
          );
        })}
      </div>
    ),
    [list]
  );

  return (
    <section className="users">
      {getUserList}
      {isloading && <Loader />}
      <div ref={loaderRef} />
      {isError && <p className="error">Ошибка загрузки...</p>}
    </section>
  );
};

export default Users;
