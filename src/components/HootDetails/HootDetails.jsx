import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router';

import * as hootService from '../../services/hootService';

// Context
import { UserContext } from '../../contexts/UserContext';

const HootDetails = (props) => {
  const { hootId } = useParams();
  const { user } = useContext(UserContext);

  const [hoot, setHoot] = useState(null);

  useEffect(() => {
    const fetchHoot = async () => {
      const hootData = await hootService.show(hootId);
      setHoot(hootData);
    };

    fetchHoot();
  }, [hootId]);

  if (!hoot) return <main>Loading...</main>;

  return (
    <main>
      <section>
        <header>
          <p>{hoot.category.toUpperCase()}</p>

          <h1>{hoot.title}</h1>

          <p>
            {`${hoot.author.username} posted on
            ${new Date(hoot.createdAt).toLocaleDateString()}`}
          </p>

          {hoot.author._id === user._id && (
            <>
              <Link to={`/hoots/${hootId}/edit`}>Edit</Link>

              <button onClick={() => props.handleDeleteHoot(hootId)}>
                Delete
              </button>
            </>
          )}
        </header>

        <p>{hoot.text}</p>
      </section>

      <section>
        <h2>Comments</h2>

        {!hoot.comments.length && <p>There are no comments.</p>}

        {hoot.comments.map((comment) => (
          <article key={comment._id}>
            <header>
              <p>
                {`${comment.author.username} posted on
                ${new Date(comment.createdAt).toLocaleDateString()}`}
              </p>
            </header>

            <p>{comment.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
};

export default HootDetails;