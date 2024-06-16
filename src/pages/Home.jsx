import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { baseURL } from '../axios';

import { Post } from '../components/Post';
import { TagsBlock } from '../components/TagsBlock';
import { CommentsBlock } from '../components/CommentsBlock';
import { fetchPosts, fetchTags } from '../redux/slices/post';

export const Home = () => {
   const dispatch = useDispatch();
   const userData = useSelector((state) => state.auth.data);
   const { posts, tags } = useSelector((state) => state.posts);
   const [searchQuery, setSearchQuery] = useState('');

   const isPostsLoading = posts.status === 'loading';
   const isTagsLoading = tags.status === 'loading';

   React.useEffect(() => {
      dispatch(fetchPosts());
      dispatch(fetchTags());
   }, [dispatch]);

   const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
   };

   const filteredPosts = posts.items.filter((post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()),
   );

   return (
      <>
         <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
            <Tab label="Новые" />
            <Tab label="Популярные" />
         </Tabs>
         <TextField
            fullWidth
            variant="outlined"
            placeholder="Поиск по названию номера"
            value={searchQuery}
            onChange={handleSearchChange}
            style={{ marginBottom: 15 }}
         />
         <Grid container spacing={4}>
            <Grid xs={8} item>
               {(isPostsLoading ? [...Array(5)] : filteredPosts).map((obj, index) =>
                  isPostsLoading ? (
                     <Post key={index} isLoading={true} />
                  ) : (
                     <Post
                        key={obj._id}
                        id={obj._id}
                        title={obj.title}
                        imageUrl={obj.imageUrl ? `${baseURL}${obj.imageUrl}` : ''}
                        user={obj.user}
                        createdAt={obj.createdAt}
                        viewsCount={obj.viewsCount}
                        commentsCount={3}
                        tags={obj.tags}
                        isEditable={userData?._id === obj.user._id}
                     />
                  ),
               )}
            </Grid>
            <Grid xs={4} item>
               <TagsBlock items={tags.items} isLoading={isTagsLoading} />
               {/* // ,fy
                <CommentsBlock
                  items={[
                     {
                        user: {
                           fullName: 'Вася Пупкин',
                           avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                        },
                        text: 'Это тестовый комментарий',
                     },
                     {
                        user: {
                           fullName: 'Иван Иванов',
                           avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                        },
                        text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                     },
                  ]}
                  isLoading={false}
               /> */}
            </Grid>
         </Grid>
      </>
   );
};
