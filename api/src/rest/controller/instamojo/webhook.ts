/* eslint-disable camelcase */
import { Request, Response } from 'express';
import { prisma } from 'utils/context';

export const instaMojowebhook = async (req: Request, res: Response) => {
  const { buyer, payment_id, amount, purpose, status } = req.body;

  try {
    if (status === 'Credit') {
      const user = await prisma.user.update({
        where: {
          email: buyer,
        },
        data: {
          festID: {
            push: 'nitrutsav-2023',
          },
        },
      });

      await prisma.transaction.create({
        data: {
          amount: parseInt(amount, 10),
          userID: user.id,
          transactionID: payment_id,
          type: 'REGISTRATION',
          timestamp: new Date(),
          orgID: '640892e9f785cdd0afcd8ccf',
          comment: purpose,
        },
      });

      return res.status(200).send('ok');
    }

    return res.send(400).send('Not Credit Type');
  } catch (error) {
    return res.status(500).send(error);
  }
};
