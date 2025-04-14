import RingCentral from "@rc-ex/core";

const rc = new RingCentral({
  server: process.env.RINGCENTRAL_SERVER_URL,
  clientId: process.env.RINGCENTRAL_CLIENT_ID,
  clientSecret: process.env.RINGCENTRAL_CLIENT_SECRET,
});

const main = async () => {
  await rc.authorize({ jwt: process.env.RINGCENTRAL_JWT_TOKEN! });

  // list all the group members
  const groupId = process.env.RINGCENTRAL_GROUP_ID!;
  const r = await rc.get(
    `/restapi/v1.0/account/~/user-group/${groupId}/members`,
  );
  console.log(r.data);

  // add or remove members from user group
  const r2 = await rc.post(`/restapi/v1.0/account/~/user-group/bulk-assign`, {
    items: [
      {
        groupId,
        addedExtensionIds: [
          process.env.RINGCENTRAL_MEMBER_ID!,
        ], // this cannot be omitted, even if empty
        removedExtensionIds: [
          // process.env.RINGCENTRAL_MEMBER_ID!,
        ], // this cannot be omitted, even if empty
      },
    ],
  });
  console.log(r2.data);

  await rc.revoke();
};
main();
