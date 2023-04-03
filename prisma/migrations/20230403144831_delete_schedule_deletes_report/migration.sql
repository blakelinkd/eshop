-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_scheduleId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_scheduleId_fkey" FOREIGN KEY ("scheduleId") REFERENCES "Schedule"("id") ON DELETE CASCADE ON UPDATE CASCADE;
