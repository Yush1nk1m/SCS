import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { fetchUserProfile } from '../api/api';

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const ProfileItem = styled.div`
  background-color: #f0f0f0;
  padding: 1rem;
  margin: 0.5rem 0;
  border-radius: 5px;
  width: 300px;
`;

const MyPage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    fetchUserProfile().then((data) => setUserProfile(data));
  }, []);

  return (
    <ProfileContainer>
      {userProfile ? (
        <>
          <ProfileItem>Email: {userProfile.email}</ProfileItem>
          <ProfileItem>Nickname: {userProfile.nickname}</ProfileItem>
          <ProfileItem>Affiliation: {userProfile.affiliation}</ProfileItem>
          <ProfileItem>Position: {userProfile.position}</ProfileItem>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </ProfileContainer>
  );
};

export default MyPage;
