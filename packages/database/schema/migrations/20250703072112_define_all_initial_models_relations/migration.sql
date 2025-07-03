-- CreateEnum
CREATE TYPE "QuizSessionType" AS ENUM ('live', 'scheduled');

-- CreateEnum
CREATE TYPE "QuizSessionStatus" AS ENUM ('pending', 'active', 'completed', 'cancelled');

-- CreateEnum
CREATE TYPE "QuestionType" AS ENUM ('multiple_choice_single', 'multiple_choice_multi', 'true_false', 'short_answer');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('educator', 'learner');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('educator', 'learner');

-- CreateTable
CREATE TABLE "CorrectAnswers" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "optionId" TEXT,
    "textAnswer" TEXT,
    "acceptableAnswers" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CorrectAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CorrectMultiSelectOptions" (
    "questionId" TEXT NOT NULL,
    "optionId" TEXT NOT NULL,

    CONSTRAINT "CorrectMultiSelectOptions_pkey" PRIMARY KEY ("questionId","optionId")
);

-- CreateTable
CREATE TABLE "StudentAnswers" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "submittedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isCorrect" BOOLEAN,
    "scoreEarned" INTEGER,
    "selectedOptionId" TEXT,
    "submittedTextAnswer" TEXT,

    CONSTRAINT "StudentAnswers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StudentMultiSelectAnswers" (
    "studentAnswerId" TEXT NOT NULL,
    "selectedOptionId" TEXT NOT NULL,

    CONSTRAINT "StudentMultiSelectAnswers_pkey" PRIMARY KEY ("studentAnswerId","selectedOptionId")
);

-- CreateTable
CREATE TABLE "QuizSessions" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionCode" TEXT,
    "sessionSlug" TEXT,
    "type" "QuizSessionType" NOT NULL,
    "status" "QuizSessionStatus" NOT NULL DEFAULT 'pending',
    "currentQuestionIndex" INTEGER NOT NULL DEFAULT 0,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuizSessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizParticipants" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "userId" TEXT,
    "anonymousName" TEXT,
    "joinedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizParticipants_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuizScore" (
    "id" TEXT NOT NULL,
    "participantId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "maxPossibleScore" INTEGER NOT NULL,
    "completionTimeSeconds" INTEGER,
    "finishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "QuizScore_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Quizzes" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Quizzes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" TEXT NOT NULL,
    "quizId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "type" "QuestionType" NOT NULL,
    "points" INTEGER NOT NULL DEFAULT 1,
    "mediaUrl" TEXT,
    "explanation" TEXT,
    "index" INTEGER NOT NULL,
    "timeLimit" INTEGER NOT NULL DEFAULT 30,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionOptions" (
    "id" TEXT NOT NULL,
    "questionId" TEXT NOT NULL,
    "text" TEXT NOT NULL,
    "mediaUrl" TEXT,
    "index" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "fullName" TEXT,
    "role" "UserRole" NOT NULL,
    "image" TEXT,
    "emailVerified" TIMESTAMP(3),
    "phoneVerified" TIMESTAMP(3),
    "status" "UserStatus" NOT NULL DEFAULT 'learner',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Accounts" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,

    CONSTRAINT "Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Sessions" (
    "id" TEXT NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CorrectAnswers_questionId_key" ON "CorrectAnswers"("questionId");

-- CreateIndex
CREATE UNIQUE INDEX "StudentAnswers_participantId_questionId_key" ON "StudentAnswers"("participantId", "questionId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizParticipants_sessionId_userId_key" ON "QuizParticipants"("sessionId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuizParticipants_sessionId_anonymousName_key" ON "QuizParticipants"("sessionId", "anonymousName");

-- CreateIndex
CREATE UNIQUE INDEX "QuizScore_participantId_key" ON "QuizScore"("participantId");

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Users_phone_key" ON "Users"("phone");

-- CreateIndex
CREATE INDEX "Users_email_id_idx" ON "Users"("email", "id");

-- CreateIndex
CREATE UNIQUE INDEX "Accounts_provider_providerAccountId_key" ON "Accounts"("provider", "providerAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "Sessions_sessionToken_key" ON "Sessions"("sessionToken");

-- CreateIndex
CREATE INDEX "Sessions_sessionToken_idx" ON "Sessions"("sessionToken");

-- AddForeignKey
ALTER TABLE "CorrectAnswers" ADD CONSTRAINT "CorrectAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectAnswers" ADD CONSTRAINT "CorrectAnswers_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "QuestionOptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectMultiSelectOptions" ADD CONSTRAINT "CorrectMultiSelectOptions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CorrectMultiSelectOptions" ADD CONSTRAINT "CorrectMultiSelectOptions_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "QuestionOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswers" ADD CONSTRAINT "StudentAnswers_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "QuizParticipants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswers" ADD CONSTRAINT "StudentAnswers_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswers" ADD CONSTRAINT "StudentAnswers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentAnswers" ADD CONSTRAINT "StudentAnswers_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "QuestionOptions"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMultiSelectAnswers" ADD CONSTRAINT "StudentMultiSelectAnswers_studentAnswerId_fkey" FOREIGN KEY ("studentAnswerId") REFERENCES "StudentAnswers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StudentMultiSelectAnswers" ADD CONSTRAINT "StudentMultiSelectAnswers_selectedOptionId_fkey" FOREIGN KEY ("selectedOptionId") REFERENCES "QuestionOptions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSessions" ADD CONSTRAINT "QuizSessions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizSessions" ADD CONSTRAINT "QuizSessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizParticipants" ADD CONSTRAINT "QuizParticipants_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizParticipants" ADD CONSTRAINT "QuizParticipants_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_participantId_fkey" FOREIGN KEY ("participantId") REFERENCES "QuizParticipants"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuizScore" ADD CONSTRAINT "QuizScore_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuizSessions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Quizzes" ADD CONSTRAINT "Quizzes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Questions" ADD CONSTRAINT "Questions_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "Quizzes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionOptions" ADD CONSTRAINT "QuestionOptions_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Questions"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Accounts" ADD CONSTRAINT "Accounts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Sessions" ADD CONSTRAINT "Sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
