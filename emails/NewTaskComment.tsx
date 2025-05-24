import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface VercelInviteUserEmailProps {
  commentFromUser: string;
  username: string;
  userLanguage: string;
  comment: string;
  taskId: string;
}

const baseUrl = process.env.NEXT_PUBLIC_APP_URL;

export const NewTaskCommentEmail = ({
  commentFromUser,
  username,
  userLanguage,
  comment,
  taskId,
}: VercelInviteUserEmailProps) => {
  const previewText =
    userLanguage === "en"
      ? `New task comment from ${process.env.NEXT_PUBLIC_APP_NAME} app`
      : `Nový komentář k úkolu z aplikace  ${process.env.NEXT_PUBLIC_APP_NAME}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              {userLanguage === "en"
                ? "There is new comment on task you are watching"
                : "Na úkolu, který sledujete, je nový komentář"}
            </Heading>
            <Text className="text-black text-[14px] leading-[24px]">
              {userLanguage === "en"
                ? `Hello ${username},`
                : `Dobrý den ${username},`}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              <strong>{commentFromUser}</strong>
              {userLanguage === "en"
                ? ` has leave a comment in Project - (Board) you are watching. `
                : ` zanechal(a) komentář v Projektu - (Boardu), který sledujete. `}
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              {userLanguage === "en" ? `Comment: ` : `Komentář: `}
              <strong>{comment}</strong>
            </Text>
            <Text className="text-black text-[14px] leading-[24px]">
              {userLanguage === "en"
                ? `
              Details you can find here: `
                : `
              Podrobnosti najdete zde: `}

              <strong>{`${process.env.NEXT_PUBLIC_APP_URL}/projects/tasks/viewtask/${taskId}`}</strong>
            </Text>
            <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-slate-800 rounded-md text-white  py-3 px-4 text-[12px] font-semibold no-underline text-center"
                href={`${process.env.NEXT_PUBLIC_APP_URL}/projects/tasks/viewtask/${taskId}`}
              >
                {userLanguage === "en" ? "View task detail" : "Zobrazit úkol"}
              </Button>
            </Section>
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />
            <Text className="text-[#666666] text-[12px] leading-[24px]">
              {userLanguage === "en"
                ? `This message was intended for - `
                : `Tato zpráva  byla určeno pro - `}
              <span className="text-black">{username}</span>.
              <span className="text-black"></span>.
              {userLanguage === "en"
                ? "If you were not expecting this message, you can ignore this email. If you are concerned about your account&apos;s safety, please reply to this email to get in touch with us."
                : "Pokud jste tuto zprávu neočekávali, můžete tento e-mail ignorovat. Pokud se obáváte o bezpečnost svého účtu, odpovězte na tento e-mail, abyste se s námi spojili."}
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
};

export default NewTaskCommentEmail;
