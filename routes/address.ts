/*
 * Copyright (c) 2014-2025 Bjoern Kimminich & the OWASP Juice Shop contributors.
 * SPDX-License-Identifier: MIT
 */

import { type Request, type Response } from 'express'
import { AddressModel } from '../models/address'

export function getAddress () {
  return async (req: Request, res: Response) => {
    const addresses = await AddressModel.findAll({ where: { UserId: req.body.UserId } })
    res.status(200).json({ status: 'success', data: addresses })
  }
}

export function getAddressById () {
  return async (req: Request, res: Response) => {
    const address = await AddressModel.findOne({ where: { id: req.params.id, UserId: req.body.UserId } })
    if (address != null) {
      res.status(200).json({ status: 'success', data: address })
    } else {
      res.status(400).json({ status: 'error', data: 'Malicious activity detected.' })
    }
  }
}

export function updateAddressById () {
  return async (req: Request, res: Response) => {
    const address = await AddressModel.findOne({ where: { id: req.params.id, UserId: req.body.UserId } })
    if (address == null) {
      res.status(400).json({ status: 'error', data: 'Malicious activity detected.' })
      return
    }

    const updates: {
      fullName?: string
      mobileNum?: number
      zipCode?: string
      streetAddress?: string
      city?: string
      state?: string | null
      country?: string
    } = {}
    if (req.body.fullName !== undefined) updates.fullName = req.body.fullName
    if (req.body.mobileNum !== undefined) updates.mobileNum = req.body.mobileNum
    if (req.body.zipCode !== undefined) updates.zipCode = req.body.zipCode
    if (req.body.streetAddress !== undefined) updates.streetAddress = req.body.streetAddress
    if (req.body.city !== undefined) updates.city = req.body.city
    if (req.body.state !== undefined) updates.state = req.body.state
    if (req.body.country !== undefined) updates.country = req.body.country

    await address.update(updates)
    res.status(200).json({ status: 'success', data: address })
  }
}

export function delAddressById () {
  return async (req: Request, res: Response) => {
    const address = await AddressModel.destroy({ where: { id: req.params.id, UserId: req.body.UserId } })
    if (address) {
      res.status(200).json({ status: 'success', data: 'Address deleted successfully.' })
    } else {
      res.status(400).json({ status: 'error', data: 'Malicious activity detected.' })
    }
  }
}
