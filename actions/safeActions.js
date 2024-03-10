import { createSafeActionClient } from "next-safe-action";
import { getServerSession } from "next-auth";
import { authOptions } from "/lib/auth";

export class ActionError extends Error {}

export const serverAction = createSafeActionClient({
   handleReturnedServerError (e) {
      if (e instanceof ActionError) {
         return e.message
      }
      return 'Il y eu un problème'
   }
});

export const authenticatedAction = createSafeActionClient({
   handleReturnedServerError(e) {
      if (e instanceof ActionError) {
         return e.message
      }
      return 'Il y eu un problème'
   },
   async middleware () {
      const session = await getServerSession(authOptions)

      if (!session?.user) {
         throw new ActionError('Vous devez être connecté')
      }
      return session.user.email
   }
});