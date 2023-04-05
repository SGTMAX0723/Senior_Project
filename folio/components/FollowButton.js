import { useState, useEffect } from 'react';
import { pb } from 'components/UserAuthentication';
const user = pb.authStore.model;

function FollowButton(props) {
  const [following, setFollowing] = useState([]);
  const [hydrated, setHydrated] = useState(false);
    useEffect(() => {
		setHydrated(true);
	}, []);
	if (!hydrated) {
		return null;
	}

  async function unfollow() {
    let expandFollowers = 'follows = "' + user.id + '" && followed = "' + props.followId + '"';
    try {
        const records = await pb.collection('connections').getList(1, 100000000, /* batch size */ {
            sort: '-created',
            filter: expandFollowers
        });
        setFollowing(records.items)
        following.map(async ({ id }) => {
          await pb.collection('connections').delete(id);
          console.log(id)
          props.onUnfollow();
        })
    } catch (e) {
        console.log('error', e);
    }
  }

  async function follow() {
    let expandFollowers = 'follows = "' + user.id + '" && followed = "' + props.followId + '"';
    try {
        const records = await pb.collection('connections').getList(1, 100000000, /* batch size */ {
            sort: '-created',
            filter: expandFollowers
        });
    } catch (e) {
      await pb.collection('connections').create({
        'follows': props.userId,
        'followed': props.followId,
      });
      props.onFollow();
    }
  }

  return (
    <button onClick={() => {props.following && props.match || props.cardType === 'following'? unfollow() : follow()}} className={'border-2 w-32 bg-blue-500 mt-2 rounded-full hover:from-pink-500 hover:bg-blue-600 text-white'}>
        {props.following && props.match || props.cardType === 'following' ? 'Unfollow' : 'Follow'}
    </button>
  );
}

export default FollowButton;