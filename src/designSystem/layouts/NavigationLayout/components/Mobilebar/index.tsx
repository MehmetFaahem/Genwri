import { useUserContext } from '@/core/context'
import { Utility } from '@/core/helpers/utility'
import { useDesignSystem } from '@/designSystem/provider'
import { MenuOutlined } from '@ant-design/icons'
import { Avatar, ConfigProvider, Dropdown, Flex, Tag } from 'antd'
import { useRouter } from 'next/navigation'
import { NavigationItem } from '../../types'

import {
  preventContextMenu,
  preventKeyboardEvent,
} from '@/core/helpers/preventer'
import { useEffect } from 'react'
import { Logo } from '../Logo'

interface Props {
  keySelected?: string
  items: NavigationItem[]
}

export const Mobilebar: React.FC<Props> = ({ keySelected, items }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => preventKeyboardEvent(e as any)
    document.addEventListener('keydown', handler)

    return () => {
      document.removeEventListener('keydown', handler)
    }
  }, [])

  const router = useRouter()

  const { user, checkRole } = useUserContext()
  const { isMobile } = useDesignSystem()

  if (!isMobile) {
    return <></>
  }

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        className="p-2"
        onContextMenu={preventContextMenu}
      >
        <Flex>
          <Logo height={40} />
        </Flex>

        <Flex align="center">
          {checkRole('ADMIN') && (
            <Tag color="red" bordered={false}>
              Admin
            </Tag>
          )}

          <ConfigProvider
            theme={{
              token: { colorPrimary: '#000000' },
              components: {
                Dropdown: {
                  colorText: '#000000',
                },
              },
            }}
          >
            <Dropdown
              menu={{
                items: items.map(item => ({
                  ...item,
                  className:
                    item.key === keySelected
                      ? 'ant-dropdown-menu-item-selected'
                      : '',
                })),
              }}
              trigger={['click']}
            >
              <MenuOutlined
                style={{
                  fontSize: '20px',
                  padding: '0 12px',
                  cursor: 'pointer',
                  color: '#ffffff',
                }}
              />
            </Dropdown>
          </ConfigProvider>
          {user && (
            <Flex>
              <Avatar
                src={user.pictureUrl}
                alt={user.name}
                size="small"
                onClick={() => router.push('/profile')}
                style={{ cursor: 'pointer' }}
              >
                {Utility.stringToInitials(user.name)}
              </Avatar>
            </Flex>
          )}
        </Flex>
      </Flex>
    </>
  )
}
